export interface DocumentItem {
  ok: {
    issueDate: string;
    source: {
      name: string;
    };
    title: {
      text: string;
    };
    content: {
      markup: string;
    };
    attributes: {
      wordCount: number;
    };
    url: string;
  };
}