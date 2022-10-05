export function getInterviewRoomLink({ projectId, intervieweeId }) {
  return `/interview/${projectId}/${intervieweeId}`;
}

export function getWelcomLink({ projectId, intervieweeId }) {
  return `${window.location.origin}/welcome/${projectId}/${intervieweeId}`;
}

export function getDetailResultLink({ projectId, intervieweeId }) {
  return `/result/${projectId}/${intervieweeId}`;
}
