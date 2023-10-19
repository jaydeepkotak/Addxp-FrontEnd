"use client";
import { useEffect, useState } from "react";
import strapi from "../../Configurations/Config.json";
import RichText from "@/Components/Common.jsx";

import { useRouter } from "next/navigation";

export default function HeaderForms(props: any) {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [requirement, setRequirement] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const toggleForm = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };
  useEffect(() => {
    document.body.classList.toggle("show_form", isOpen);
  }, [isOpen]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await fetch(strapi.strapigraphql, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
          mutation createContactFormData($FullName:String!,$BusinessEmail:String!,$CompanyName:String!,$Requirement:String!){
            createContactFormData(data: { FullName: $FullName,BusinessEmail:$BusinessEmail,CompanyName:$CompanyName,Requirement:$Requirement}) {
                data {
                      id
                        attributes {
                            FullName
                            BusinessEmail
                            CompanyName
                            Requirement
                        }
                    }
                }
            }
          `,
          variables: {
            FullName: fullName,
            BusinessEmail: businessEmail,
            CompanyName: companyName,
            Requirement: requirement,
          },
        }),
      });
      if (response.status == 200) {
        router.push("/thank-you");
      }
    } catch (error) {
      alert("Something Wrong");
    }
  };
  return (
    <div className='form-icon'>
      <a href='javascript:void(0)' className='icon-rocket' onClick={toggleForm}>
        <img src='https://www.addxp.com/src/images/rocket-icon.svg' alt='rocket-icon' className='icon' />
        <img src='https://www.addxp.com/src/images/plane-line-svg.png' alt='plane-line-svg' className='icon-hover' />
      </a>
      <div className='slide-form'>
        <a href='javascript:void(0)' className='slide-form-close' onClick={toggleForm}>
          Close
          <img src={strapi.strapihost + "/uploads/slide_close_3b3e805087.svg"} alt='slide-close' />
        </a>
        <h5>{props.data.Title}</h5>
        <RichText htmlContent={props.data.Description}></RichText>
        <form id='HeaderContactUs' onSubmit={handleSubmit}>
          <div className='row'>
            <div className='col'>
              <div className='form-floating form-group'>
                <input
                  type='text'
                  className='form-control'
                  id='HUserName'
                  placeholder='Full Name'
                  required
                  onChange={(e) => setFullName(e.target.value)}
                />
                <label htmlFor='HUserName'>Full Name</label>
              </div>
            </div>

            <div className='col'>
              <div className='form-floating form-group'>
                <input
                  type='email'
                  className='form-control'
                  id='HUserEmailID'
                  placeholder='Business Email'
                  required
                  onChange={(e) => setBusinessEmail(e.target.value)}
                />
                <label htmlFor='HUserEmailID'>Business Email</label>
              </div>
            </div>

            <div className='col-12'>
              <div className='form-floating form-group'>
                <input
                  type='text'
                  className='form-control'
                  id='HUserCompanyName'
                  placeholder='Company Name'
                  required
                  onChange={(e) => setCompanyName(e.target.value)}
                />
                <label htmlFor='HUserCompanyName'>Company Name</label>
              </div>
            </div>

            <div className='col-12'>
              <div className='form-floating form-group'>
                <input
                  type='text'
                  className='form-control'
                  id='HUserRequirements'
                  placeholder='Company Name'
                  required
                  onChange={(e) => setRequirement(e.target.value)}
                />
                <label htmlFor='HUserRequirements'>Describe Your Requirements (Optional)</label>
              </div>

              <div className='form-check d-flex'>
                <input className='form-check-input' type='checkbox' value='' id='form2Example33' />
                <label className='form-check-label' htmlFor='form2Example33'>
                  I agree to receive future communications from Addxp, in accordance with the
                  <a href='/privacy-policy'>Privacy Policy</a> &<a href='/terms-conditions'>Terms Of Use</a>
                </label>
              </div>
            </div>

            <button
              type='submit'
              id='submit'
              data-form-name='HeaderContactUsData'
              className='btn btn-defualt btn-block'
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
