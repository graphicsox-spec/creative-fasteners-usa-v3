import { useState, type ChangeEvent, type FormEvent } from 'react';

type RFQValues = {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  comments: string;
};

type RFQErrors = Partial<Record<keyof RFQValues, string>>;

const initialValues: RFQValues = {
  fullName: '',
  company: '',
  email: '',
  phone: '',
  comments: '',
};

export function RFQForm() {
  const [values, setValues] = useState<RFQValues>(initialValues);
  const [errors, setErrors] = useState<RFQErrors>({});
  const [integrationNotice, setIntegrationNotice] = useState(false);

  const updateValue = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    setIntegrationNotice(false);
  };

  const validate = () => {
    const nextErrors: RFQErrors = {};

    if (!values.fullName.trim()) nextErrors.fullName = 'Enter your full name.';
    if (!values.company.trim()) nextErrors.company = 'Enter your company name.';
    if (!values.email.trim()) nextErrors.email = 'Enter your work email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) nextErrors.email = 'Enter a valid email address.';
    if (!values.phone.trim()) nextErrors.phone = 'Enter your phone number.';
    else if (!/^[+\d\s().-]{7,24}$/.test(values.phone)) nextErrors.phone = 'Enter a valid phone number.';

    return nextErrors;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    setIntegrationNotice(false);

    if (Object.keys(nextErrors).length > 0) {
      requestAnimationFrame(() => document.getElementById('rfq-error-summary')?.focus());
      return;
    }

    setIntegrationNotice(true);
    requestAnimationFrame(() => document.getElementById('rfq-integration-notice')?.focus());
  };

  const fieldError = (name: keyof RFQErrors) => (errors[name] ? `${name}-error` : undefined);

  return (
    <form className="rfq-form" onSubmit={handleSubmit} noValidate>
      {Object.keys(errors).length > 0 ? (
        <div id="rfq-error-summary" className="form-status form-status--error" role="alert" tabIndex={-1}>
          <strong>Please review the highlighted fields.</strong>
          <span>Your request has not been sent.</span>
        </div>
      ) : null}

      {integrationNotice ? (
        <div id="rfq-integration-notice" className="form-status form-status--notice" role="status" tabIndex={-1}>
          <strong>Your contact details passed local validation.</strong>
          <span>
            Nothing was transmitted because the submission service is not connected yet. Please use the confirmed sales contact once supplied.
          </span>
        </div>
      ) : null}

      <div className="rfq-form__grid">
        <div className="field">
          <label htmlFor="fullName">Full Name <span aria-hidden="true">*</span></label>
          <input id="fullName" name="fullName" value={values.fullName} onChange={updateValue} autoComplete="name" required aria-invalid={Boolean(errors.fullName)} aria-describedby={fieldError('fullName')} />
          {errors.fullName ? <span id="fullName-error" className="field__error">{errors.fullName}</span> : null}
        </div>
        <div className="field">
          <label htmlFor="company">Company <span aria-hidden="true">*</span></label>
          <input id="company" name="company" value={values.company} onChange={updateValue} autoComplete="organization" required aria-invalid={Boolean(errors.company)} aria-describedby={fieldError('company')} />
          {errors.company ? <span id="company-error" className="field__error">{errors.company}</span> : null}
        </div>
        <div className="field">
          <label htmlFor="email">Work Email <span aria-hidden="true">*</span></label>
          <input id="email" name="email" type="email" value={values.email} onChange={updateValue} autoComplete="email" required aria-invalid={Boolean(errors.email)} aria-describedby={fieldError('email')} />
          {errors.email ? <span id="email-error" className="field__error">{errors.email}</span> : null}
        </div>
        <div className="field">
          <label htmlFor="phone">Phone <span aria-hidden="true">*</span></label>
          <input id="phone" name="phone" type="tel" value={values.phone} onChange={updateValue} autoComplete="tel" required aria-invalid={Boolean(errors.phone)} aria-describedby={fieldError('phone')} />
          {errors.phone ? <span id="phone-error" className="field__error">{errors.phone}</span> : null}
        </div>
        <div className="field field--full">
          <label htmlFor="comments">Comments</label>
          <textarea id="comments" name="comments" rows={5} value={values.comments} onChange={updateValue} placeholder="Tell us briefly what you need or how we can help." />
        </div>
      </div>

      <div className="rfq-form__footer">
        <p>
          Your information will only be used to review this request. Secure transmission and storage must be confirmed when the form backend is connected.
        </p>
        <button className="button button--primary" type="submit">Submit Request</button>
      </div>
    </form>
  );
}
