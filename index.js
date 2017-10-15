import filter from 'filter-object';

export function control(str, targetRole) {
  const lines = str.split("\n");

  const controlledLines = lines.map((line) => {
    const result = exctractRole(line);

    if (result) {
      const { role, key } = result;

      if ((role === targetRole && key === 'except') || (role !== targetRole && key === 'only')) {
        line = commentOutTheLine(line);
      }
    }

    return line;
  });

  return controlledLines.join("\n");
}

function commentOutTheLine(str) {
  return '#' + str
}

function exctractRole(str) {
  let role, key;

  if (str.includes('except_') || str.includes('only_')) {
    const words = str.split(' ');

    words.forEach((word) => {
      if (word.includes('except_') || word.includes('only_')) {
        if (word.includes('#')) word = word.replace('#', '');

        const splittedWord = word.split('_');
        role = splittedWord[1];
        key = splittedWord[0];
      }
    })
  }

  if (!role) return null;

  return { role, key }
}

export function controlResolver(resolver, rolePattern) {
  return filter(resolver, rolePattern)
}