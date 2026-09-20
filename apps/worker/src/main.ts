export async function runWorkerOnce(): Promise<{
  processed: number;
  mode: "local_double";
}> {
  return { processed: 0, mode: "local_double" };
}

if (process.env.NEKORU_WORKER_RUN_ONCE === "true")
  process.stdout.write(`${JSON.stringify(await runWorkerOnce())}\n`);
