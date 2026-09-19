import SiteForm, { Field } from "./SiteForm";

export default function KeepMePostedForm() {
  return (
    <SiteForm
      action="/api/keep-me-posted"
      submitLabel="Keep me posted"
      done={{ title: "You are on the list.", body: "We will email you when the venue and tickets are announced. Nothing else, and never sold." }}
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field name="name" labelText="Name" required autoComplete="name" />
        <Field name="email" labelText="Email" type="email" required autoComplete="email" />
      </div>
    </SiteForm>
  );
}
