"use client";
import React from "react";
import faqStyles from "../../blog/blogStyles.module.scss";
import { Collapse } from "antd";

export interface CollapseFAQComponentProps {
  FAQs?: any;
}

const CollapseFAQComponent = (props: CollapseFAQComponentProps) => {
  const { FAQs } = props;

  return (
    <div className={`mt-5 ${faqStyles.collapse}`}>
      <Collapse
        accordion
        defaultActiveKey={["2"]}
        bordered={false}
        ghost
        items={FAQs?.map((faq: any) => ({
          key: faq?.key,
          label: (
            <div className="md:text-xl text-[18px] font-semibold text-white/80 hover:text-white active:text-white focus:text-white">
              {faq?.title}
            </div>
          ),
          children: (
            <p className="text-white/80 text-base font-normal">{faq?.des}</p>
          ),
        }))}
      />
    </div>
  );
};

export default CollapseFAQComponent;
