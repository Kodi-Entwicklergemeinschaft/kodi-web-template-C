import { useState, useMemo } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { ApiRoutes, APPROUTES } from '../utilities/routes';
import { EMAIL_REGEX_FEEDBACK } from '../utilities/constants';
import axiosInstance from '../axiosConfig';

const useFeedback = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [name, _setName] = useState('');
  const [email, _setEmail] = useState('');
  const [feedback, _setFeedback] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isPrivacyChecked, _setIsPrivacyChecked] = useState(false); 

  const resetForm = () => {
    _setName('');
    _setEmail('');
    _setFeedback('');
    _setIsPrivacyChecked(false);
    setErrors({});
  };

  const setNameWithValidation = (value: string) => {
    _setName(value);
    setErrors(prev => ({
      ...prev,
      name: value.trim() ? '' : t('feedback.error.nameRequired')
    }));
  };

  const setEmailWithValidation = (value: string) => {
    _setEmail(value);
    setErrors(prev => ({
      ...prev,
      email: EMAIL_REGEX_FEEDBACK.test(value) ? '' : t('feedback.error.invalidEmail')
    }));
  };

  const setFeedbackWithValidation = (value: string) => {
    _setFeedback(value);
    setErrors(prev => ({
      ...prev,
      feedback: value.trim() && value.length >= 10 ? '' : t('feedback.error.shortFeedback')
    }));
  };

  const isFeedbackValidated = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = t('feedback.error.nameRequired');
    if (!EMAIL_REGEX_FEEDBACK.test(email)) newErrors.email = t('feedback.error.invalidEmail');
    if (!feedback.trim() || feedback.length < 10) newErrors.feedback = t('feedback.error.shortFeedback');
    if (!isPrivacyChecked) newErrors.privacy = t('feedback.error.privacyNotChecked');

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const { mutateAsync, isPending, isSuccess, isError } = useMutation({
    mutationFn: async () => {
      return await axiosInstance.post(ApiRoutes.FEEDBACKS, { title: name, description: feedback, userEmail:email, langauge: 'de', });
    },
    onSuccess: () => {
      resetForm();
      setTimeout(()=>{
        navigate({ to: APPROUTES.HOME });
      }, 2000)
    },
    onError: (err) => {
      console.error('Submit failed', err);
    },
  });

  const handleSubmit = () => {
    if (!isFeedbackValidated()) return;
    mutateAsync();
  };

  const disableSubmit = useMemo(() => {
    return !name || !email || !feedback || isPending || !isPrivacyChecked;
  }, [name, email, feedback, isPending ,  isPrivacyChecked]);

  return {
    name, setName: setNameWithValidation,
    email, setEmail: setEmailWithValidation,
    feedback, setFeedback: setFeedbackWithValidation,
    isPrivacyChecked, setIsPrivacyChecked: _setIsPrivacyChecked,
    errors,
    handleSubmit,
    disableSubmit,
    isPending,
    isSuccess,
    isError
  };
};

export default useFeedback;
