import { useState, useEffect } from 'react';

const useForm = (callback, validate) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState(false);

  useEffect(() => {}, [callback, errors, isSubmitting, values]);

  const handleSubmit =  async (event) => {
  if (event) event.preventDefault();
    setIsSubmitting(true);
    await setErrors(await validate(values))
    if (Object.keys(errors).length === 0 && isSubmitting && touched) {
      await callback(values);
      setIsSubmitting(false);
    }
  };

  const handleChange = async (event) => {
    setTouched(true);
    event.persist();
    await setValues(values => ({ ...values, [event.target.name]: event.target.value }));
  };

  const handleImgChange = async () => {
    const selectFile = document.getElementById('avatar').files;
    if (selectFile.length > 0) {
      const imageFile = selectFile[0];
      const fr = new FileReader();
      await fr.addEventListener('load', (event) => {
        const imgTag = document.getElementById('imgUser');
        imgTag.src = event.target.result;
        imgTag.innerHTML = event.target.result;
        setValues(values => ({ ...values, avatar: event.target.result }));
      });
      await fr.readAsDataURL(imageFile);
    }
  };

  return {
    handleChange,
    handleImgChange,
    handleSubmit,
    values,
    errors,
  };
};

export default useForm;
