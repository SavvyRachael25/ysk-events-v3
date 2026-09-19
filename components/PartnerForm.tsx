import SiteForm, { Field, Select, TextArea } from "./SiteForm";

export default function PartnerForm() {
  return (
    <SiteForm
      action="/api/partner"
      submitLabel="Request the sponsorship deck"
      done={{ title: "Thank you.", body: "The deck is on its way, and a person from YSK Events will follow up within two business days." }}
    >
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Field name="name" labelText="Name" required autoComplete="name" />
        <Field name="email" labelText="Email" type="email" required autoComplete="email" />
        <Field name="phone" labelText="Phone" type="tel" autoComplete="tel" placeholder="Optional" />
        <Field name="organization" labelText="Company or organization" autoComplete="organization" />
      </div>
      <Select name="tier" labelText="Which level are you thinking about?" options={["Title Partner", "Official Partner", "Community Partner", "Not sure yet"]} />
      <TextArea name="message" labelText="Anything you want us to know" placeholder="Timing, goals, questions" />
    </SiteForm>
  );
}
