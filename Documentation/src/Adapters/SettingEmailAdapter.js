export function getSettingEmail(data) {
  return [
    {
      id: 'isNew',
      label: data.newTitle,
      value: data.isNew,
    },
    {
      id: 'isWeekly',
      label: data.weeklyTitle,
      value: data.isWeekly,
    },
    {
      id: 'isStatusChange',
      label: data.statusChangeTitle,
      value: data.isStatusChange,
    },
  ];
}

export function getSettingEmailForSend(data) {
  return {
    isNew: data[0].value,
    isWeekly: data[1].value,
    isStatusChange: data[2].value,
  };
}

export default {};
