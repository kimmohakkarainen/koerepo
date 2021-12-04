export function fetchError(error) {
  return {
    type: "ERROR",
    payload: { error: "Connection error" }
  };
}
