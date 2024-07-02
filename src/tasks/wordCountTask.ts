
export const wordCounter = async (parameters: { text: string; }) => {
    const { text } = parameters;
    return text.split(' ').length;
  };
  