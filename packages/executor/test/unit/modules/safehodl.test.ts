import { describe, expect, it } from "vitest";
import { Wallet } from "ethers";
import { getClient, getConfigs, getModules } from "../../fixtures";
import { TestAccountMnemonic } from "../../constants";

describe("Safehodl module", async () => {
  const client = await getClient(); // runs anvil
  const wallet = Wallet.fromMnemonic(TestAccountMnemonic).connect(client);

  const { config, networkConfig } = await getConfigs();
  const { safehodl } = await getModules(config, networkConfig);

  it("getGasPrice should return actual onchain gas price", async () => {
    const gasFee = await client.getFeeData();
    const responseFromSafehodl = await safehodl.getGasPrice();
    expect(gasFee.maxFeePerGas).toEqual(responseFromSafehodl.maxFeePerGas);
    expect(gasFee.maxPriorityFeePerGas).toEqual(
      responseFromSafehodl.maxPriorityFeePerGas
    );
  });

  it("getConfig should return all config values and hide sensitive data", async () => {
    const configSafehodl = await safehodl.getConfig();
    expect(configSafehodl.flags.redirectRpc).toEqual(config.redirectRpc);
    expect(configSafehodl.flags.testingMode).toEqual(config.testingMode);
    expect(configSafehodl.relayers).toEqual([wallet.address]);

    const sensitiveFields = [
      "relayers",
      "relayer",
      "rpcEndpoint",
      "name",
      "merkleApiURL",
      "kolibriAuthKey",
      "echoAuthKey",
    ];
    for (const [key, value] of Object.entries(networkConfig)) {
      if (sensitiveFields.indexOf(key) > -1) continue;
      if (!configSafehodl.hasOwnProperty(key)) {
        throw new Error(`${key} is not defined in safehodl_config`);
      }
    }
  });
});
