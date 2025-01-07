import { Config } from "@safehodl/executor/lib/config";
import { Executor } from "@safehodl/executor/lib/executor";
import { AllChainsMetrics } from "@safehodl/monitoring/lib";
import * as protocols from "../../../reqresp/protocols";
import { EncodedPayloadSsz, HandlerTypeFromMessage } from "../../../reqresp/types";
import { onStatus } from "./status";
import { onPooledUserOpHashes } from "./pooledUserOpHashes";
import { onPooledUserOpsByHash } from "./pooledUserOpsByHash";
import { ts } from "@safehodl/types/lib";

export interface ReqRespHandlers {
  onStatus: () => AsyncIterable<EncodedPayloadSsz<ts.Status>>;
  onPooledUserOpHashes: HandlerTypeFromMessage<
    typeof protocols.PooledUserOpHashes
  >;
  onPooledUserOpsByHash: HandlerTypeFromMessage<
    typeof protocols.PooledUserOpsByHash
  >;
}

export function getReqRespHandlers(
  executor: Executor,
  config: Config,
  metrics: AllChainsMetrics | null
): ReqRespHandlers {
  return {
    async *onStatus() {
      yield* onStatus(config);
    },
    async *onPooledUserOpHashes(req) {
      yield* onPooledUserOpHashes(executor, config, req);
    },
    async *onPooledUserOpsByHash(req) {
      yield* onPooledUserOpsByHash(executor, config, req, metrics);
    },
  };
}
