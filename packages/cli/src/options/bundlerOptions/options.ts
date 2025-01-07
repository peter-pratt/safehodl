import { ApiOptions } from "@safehodl/types/lib/options/api";
import { ExecutorOptions } from "@safehodl/types/lib/options/executor";
import { MetricsOptions } from "@safehodl/types/lib/options/metrics";
import { P2POptions } from "@safehodl/types/lib/options/network";

export interface IBundlerOptions {
  api: ApiOptions;
  p2p: P2POptions;
  executor: ExecutorOptions;
  metrics: MetricsOptions;
}
