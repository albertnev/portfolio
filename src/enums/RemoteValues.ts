export type RemoteKeys = "full-remote" | "1-office" | "2-office" | "3-office";

const RemoteValues = new Map<RemoteKeys, string>();
RemoteValues.set("full-remote", "Full remote");
RemoteValues.set("1-office", "1 office day");
RemoteValues.set("2-office", "2 office days");
RemoteValues.set("3-office", "3 office days");

export { RemoteValues };
