export function splitMention(str): (string | undefined)[] {
  const [tag, data] = str.replace(/@|#/, '').split('-');
  if (!tag || !data) {
    return [];
  }
  const [id, userValue] = data.replace(')', '').split('(');

  return [tag, id, userValue];
}
