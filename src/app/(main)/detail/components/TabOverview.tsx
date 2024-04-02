import { Fragment } from "react";
import InfoItem from "./InfoItem";

const TabOverView = () => {
  return (
    <Fragment>
      <p className="text-base font-normal text-gray-800">
        Meet Nimbus, a Framer SaaS template thats been fine-tuned for startups
        and businesses looking for a reliable website to showcase their SaaS
        services. Designed with the modern business in mind, Nimbus offers a
        straightforward and user-friendly experience. Comprehensive Flows:
        Nimbus is just about looks; it about depth. With dedicated blog pages, a
        detailed feature list that leads to in-depth feature descriptions,
        Nimbus ensures your services are presented in full detail. Flexible
        Layout Options: We know every business is unique. That why Nimbus
        provides a wide range of layout sections. You can pick and choose, mix
        and match to create a website that truly represents your brand. Designed
        for AI-Powered Business Analytics: Nimbus speaks the language of
        AI-Powered Business Analytics Tools. Every design choice and feature is
        geared towards showcasing the power and potential of AI in business
        analytics.
      </p>
      <h4 className="text-lg font-medium text-gray-900 mb-4 mt-8">
        Template features
      </h4>
      <div className="grid grid-cols-2 gap-4">
        <InfoItem title="Animations & Effects" icon="Framer" />
        <InfoItem title="Animations & Effects" icon="Framer" />
        <InfoItem title="Animations & Effects" icon="Framer" />
        <InfoItem title="Animations & Effects" icon="Framer" />
        <InfoItem title="Animations & Effects" icon="Framer" />
        <InfoItem title="Animations & Effects" icon="Framer" />
      </div>
      <h4 className="text-lg font-medium text-gray-900 mb-4 mt-8">
        Figma features
      </h4>
      <div className="grid grid-cols-2 gap-4">
        <InfoItem title="Auto layout" icon="Figma" />
        <InfoItem title="Auto layout" icon="Figma" />
        <InfoItem title="Auto layout" icon="Figma" />
        <InfoItem title="Auto layout" icon="Figma" />
        <InfoItem title="Auto layout" icon="Figma" />
        <InfoItem title="Auto layout" icon="Figma" />
        <InfoItem title="Auto layout" icon="Figma" />
        <InfoItem title="Auto layout" icon="Figma" />
      </div>
    </Fragment>
  );
};

export default TabOverView;
