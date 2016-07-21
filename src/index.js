import debounce from 'lodash.debounce'

export default () => {
  let debouncers = {};

  const middleware = () => dispatch => action => {
    const {
      meta: { debounce={} }={},
      type
    } = action;

    const {
      time,
      key = type,
      cancel = false,
      options = {},
    } = debounce;

    const shouldDebounce = (time && key) || (cancel && key);

    if (!shouldDebounce) {
      return dispatch(action);
    }

    if (!debouncers[key]) {
      debouncers[key] = {
        time,
        debounced: _.debounce((action) => dispatch(action), time, options)
      }
    }

    const { debounced } = debouncers[key]
    if (cancel) {
      debouncer.cancel()
    } else {
      debouncer(action)
    }
  };

  middleware._debouncers = debouncers;

  return middleware;
};
