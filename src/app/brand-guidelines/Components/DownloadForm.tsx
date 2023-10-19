"use client";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import strapi from "../../../Configurations/Config.json";
import { useRouter } from "next/navigation";

export default function DownloadForm(props: any) {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<UserData>();
  const [fullName, setFullName] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const pdfUrl = "/pdf/Brand Guidelines - Addxp Technologies.pdf";

  const config: AxiosRequestConfig = {
    method: "POST",
    url: strapi.strapigraphql,

    data: {
      query: props.query,
    },
  };
  async function fetchdata() {
    try {
      const response = await axios(config);
      setUserDetails(response.data.data.brandGuideline);
    } catch (err) {
      console.log("ERROR DURING AXIOS REQUEST", err);
    } finally {
    }
  }
  useEffect(() => {
    fetchdata();
  }, []);
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
          mutation createDownloadFormData($FullName:String!,$BusinessEmail:String!,$PhoneNumber:Long!){
            createDownloadFormData(data: { FullName: $FullName,BusinessEmail:$BusinessEmail,PhoneNumber:$PhoneNumber}) {
              data{
                id
                attributes{
                  FullName
                  BusinessEmail
                  PhoneNumber
                }
              }
            }
          }
          `,
          variables: {
            FullName: fullName,
            BusinessEmail: businessEmail,
            PhoneNumber: parseInt(phoneNumber),
          },
        }),
      });
      if (response.status == 200) {
        router.push(pdfUrl);
      }
    } catch (error) {
      alert("Something Wrong");
    }
  };

  return (
    <section className='brand-tagline'>
      <div className='container'>
        <div className='brand-tagline_bottom'>
          <div className='brand-tag-left'>
            <img
              src={
                strapi.strapihost +
                userDetails?.data.attributes.contact_form.data.attributes.Left.ImageData.ImageDesktop.data.attributes
                  .url
              }
              alt={
                userDetails?.data.attributes.contact_form.data.attributes.Left.ImageData.ImageDesktop.data.attributes
                  .alternativeText
              }
            />
            <h5>{userDetails?.data.attributes.contact_form.data.attributes.Left.Details.Title}</h5>
          </div>
          <div className='brand-tag-right'>
            <div className='brand-right'>
              <h5>{userDetails?.data.attributes.contact_form.data.attributes.Right.Title}</h5>
              <form onSubmit={handleSubmit}>
                <div className='form-group'>
                  <input
                    type='text'
                    id='BFullname'
                    className='inputText'
                    required
                    onChange={(e) => setFullName(e.target.value)}
                  />
                  <span className='floating-label'>Full Name</span>
                </div>
                <div className='form-group'>
                  <input
                    type='email'
                    id='BEmail'
                    className='inputText'
                    required
                    onChange={(e) => setBusinessEmail(e.target.value)}
                  />
                  <span className='floating-label'>Business Email</span>
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    id='BNumber'
                    className='inputText'
                    required
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  <span className='floating-label'>Phone Number (Optional)</span>
                </div>
                <button
                  type='submit'
                  id='Bsubmit'
                  data-form-name='BrandguidelinedownloadForm'
                  className='btn btn-defualt'
                >
                  Download
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
