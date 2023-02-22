// 编辑器自定义事件
const events = {
  redirect(url) {
    if (url) {
      window.location.href = url;
    }
  },

  alert(msg) {
    if (msg) {
      // eslint-disable-next-line no-alert
      alert(msg);
    }
  },
};

const getEventList = () => [
  {
    key: "redirect",
    label: "跳转事件",
    event: events.redirect,
    param: "",
  },
  {
    key: "alert",
    label: "alert 事件",
    event: events.alert,
    param: "",
  },
];

export { events, getEventList };
