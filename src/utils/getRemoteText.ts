import { RemoteValues, type RemoteKeys } from "@/enums/RemoteValues";

export const getRemoteText = (remote: string) => {
  const text = RemoteValues.get(remote as RemoteKeys);
  return text ?? `Invalid value for remote field: ${remote}`;
};
