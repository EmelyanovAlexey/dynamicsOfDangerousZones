export function getPost(data) {
  return data.map((dataitem) => {
    return {
      id: dataitem.id,
      title: dataitem.title,
      text: dataitem.body,
    };
  });
}

export default {};
