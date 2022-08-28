export const func = {
  functionName: (data) => {
    console.log(data);
    this.$bvToast.toast("mensagem", {
      autoHideDelay: 4000,
      variant: "success",
      appendToast: true,
      noCloseButton: true,
      toaster:
        this.$resize && this.$mq.below(768)
          ? "b-toaster-bottom-full"
          : "b-toaster-top-right",
    });
  },
};
