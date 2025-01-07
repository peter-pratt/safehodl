import { SafehodlVersion } from "@skandha/types/lib/executor";
import { Config } from "../config";

export class Web3 {
  constructor(private config: Config, private version: SafehodlVersion) {}

  clientVersion(): string {
    return `safehodl/${this.version.version}-${this.version.commit}`;
  }
}
