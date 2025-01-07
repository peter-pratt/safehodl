export enum ClientKind {
  Safehodl = "Safehodl",
  Stackup = "Stackup",
  Infinitism = "Infitinism",
  Voltaire = "Voltaire",
  Unknown = "Unknown",
}

export function clientFromAgentVersion(agentVersion: string): ClientKind {
  const slashIndex = agentVersion.indexOf("/");
  const agent =
    slashIndex >= 0 ? agentVersion.slice(0, slashIndex) : agentVersion;
  const agentLC = agent.toLowerCase();
  if (agentLC === "safehodl" || agentLC === "js-libp2p")
    return ClientKind.Safehodl;
  return ClientKind.Unknown;
}
