"use client";
import { useActionState } from "react";
import { BlockRenderer } from "@/components/BlockRenderer";
import { StrapiImage } from "./StrapiImage";
import { eventsSubscribeAction } from "@/data/action";
import { formatDate } from "@/utils/format-date";
import { SubmitButton } from "./SubmitButton";

const INITIAL_STATE = {
  zodErrors: null,
  strapiErrors: null,
  errorMessage: null,
  successMessage: null,
  formData: null,
};


function TextInput({
  id,
  label,
  name,
  type = "text",
  error,
  defaultValue,
}) {
  return (
    <div className="input__container">
      <label htmlFor={id} className="copy">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        className="input input__text input--beige"
        defaultValue={defaultValue}
      />
      {error && <p className="input__error">{error}</p>}
    </div>
  );
}

export function EventSignupForm({
  blocks,
  eventId,
  startDate,
  price,
  image,
}) {
  const [formState, formAction] = useActionState(
    eventsSubscribeAction,
    INITIAL_STATE
  );
  const zodErrors = formState?.zodErrors;
  const strapiErrors = formState?.strapiErrors?.message || formState?.errorMessage;
  const successMessage = formState?.successMessage;

  return (
    <section className="signup-form">
      <div className="signup-form__info">
        <BlockRenderer blocks={blocks} />
        {startDate && (
          <p className="signup-form__date">
            <span>StartDate:</span> {formatDate(startDate)}
          </p>
        )}
        {price && (
          <p className="signup-form__price">
            <span>Price:</span> {price}
          </p>
        )}
      </div>
      <form className="signup-form__form" action={formAction}>
        {image && (
          <StrapiImage
            src={image.url}
            alt={image.alt}
            height={200}
            width={200}
            className="signup-form__image"
          />
        )}
        <div className="signup-form__name-container">
          <TextInput
            id="firstName"
            label="First Name"
            name="firstName"
            error={zodErrors?.firstName}
            defaultValue={formState?.formData?.firstName ?? ""}
          />
          <TextInput
            id="lastName"
            label="Last Name"
            name="lastName"
            error={zodErrors?.lastName}
            defaultValue={formState?.formData?.lastName ?? ""}
          />
        </div>
        <TextInput
          id="email"
          label="Email"
          name="email"
          type="email"
          error={zodErrors?.email}
          defaultValue={formState?.formData?.email ?? ""}
        />
        <TextInput
          id="phone"
          label="Phone"
          name="telephone"
          type="text"
          error={zodErrors?.telephone}
          defaultValue={formState?.formData?.telephone ?? ""}
        />
        <input hidden type="text" name="eventId" defaultValue={eventId} />
        <SubmitButton
          text="Sign Up"
          className="btn btn--medium btn--turquoise"
        />
        {strapiErrors && <p className="signup-form__error">{strapiErrors}</p>}
        {successMessage && (
          <p className="signup-form__success">{successMessage}</p>
        )}
      </form>
    </section>
  );
}