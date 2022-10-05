import useChannel from './useChannel';

export default function usePlayers(channelId) {
  const { channel, error, mutate } = useChannel(channelId);
  const players = channel ? channel.players : [];
  return { players, error, mutate };
}
