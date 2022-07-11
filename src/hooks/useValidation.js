const useValidate = (translate) => (values) => {
  const errors = {};

  if (!values.movieTitle) {
    errors.movieTitle = 'Required';
  } else if (!/^[A-Z][a-zA-Z0-9 -—.,!?:]+/.test(values.movieTitle)) {
    errors.movieTitle = translate('app-validation-title-error');
  }

  if (!values.moviePosterPath) {
    errors.moviePosterPath = 'Required';
  } else if (!/^\/[a-zA-Z0-9]*(.jpg|.jpeg|.png|.gif)$/.test(values.moviePosterPath)) {
    errors.moviePosterPath = translate('app-validation-path-error');
  }

  if (!values.movieOverview) {
    errors.movieOverview = 'Required';
  } else if (!/^[A-Z][a-zA-Z0-9 -—.,!?:]+/.test(values.movieOverview)) {
    errors.movieOverview = translate('app-validation-overview-error');
  }

  return errors;
};

export default useValidate;
