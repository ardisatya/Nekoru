import { Client } from "@upstash/qstash";
import type { EventMessage, EventPublisher } from "@nekoru/application";

export class LocalEventPublisher implements EventPublisher {
  readonly published: EventMessage[] = [];
  async publish(message: EventMessage): Promise<void> {
    this.published.push(message);
  }
}

export class QStashEventPublisher implements EventPublisher {
  private readonly client: Client;
  constructor(
    token: string,
    private readonly destination: string,
  ) {
    this.client = new Client({ token });
  }
  async publish(message: EventMessage): Promise<void> {
    const destination = new URL(this.destination);
    if (destination.protocol !== "https:")
      throw new Error("qstash_destination_must_be_https");
    await this.client.publishJSON({
      url: destination.toString(),
      body: message.envelope,
      deduplicationId: message.event_id,
      retries: 3,
    });
  }
}
