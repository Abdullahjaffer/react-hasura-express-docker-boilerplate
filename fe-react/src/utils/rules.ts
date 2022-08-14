export const FORM_RULES = {
  ONLY_ALPHA: {
    pattern: /^[a-zA-Z ]*$/,
    message: 'Only alphabets are allowed.',
  },
  MATCH_WITH:
    (key: string) =>
    ({ getFieldValue }: any) => ({
      validator(_: any, value: any) {
        if (!value || getFieldValue(key) === value) {
          return Promise.resolve();
        }
        return Promise.reject(new Error('The two ' + key + ' that you entered do not match!'));
      },
    }),
};
