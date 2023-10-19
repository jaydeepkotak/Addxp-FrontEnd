"use client";

import strapi from "../../../Configurations/Config.json";
import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { useRouter } from "next/navigation";
import RichText from "@/Components/Common";

export default function UploadForm(props: any) {
  const router = useRouter();
  const [file, setFile] = useState<File>();
  const [userDetails, setUserDetails] = useState<UserData>();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [HyperLink, setHyperLink] = useState("");
  const [resumePath, setResumePath] = useState("");
  const [id, setId] = useState("");

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
      setUserDetails(response.data.data.uiUxDesigner);
      setId("career-details-form");
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
          mutation createUploadForm($FirstName:String!,$LastName:String!,$Email:String!,$PhoneNumber:Long!,$HyperLink:String!,$ResumePath:String!){
            createUploadForm(data: { FirstName: $FirstName,LastName:$LastName,Email:$Email,PhoneNumber:$PhoneNumber,HyperLink:$HyperLink,ResumePath:$ResumePath}) {
              data{
                id
                attributes{
                  FirstName
                  LastName
                  Email
                  PhoneNumber
                  HyperLink
                  ResumePath

                }
              }
            }
          }
          `,
          variables: {
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            PhoneNumber: parseInt(phoneNumber),
            HyperLink: HyperLink,
            ResumePath:
              resumePath.endsWith(".pdf") || resumePath.endsWith(".docx")
                ? resumePath
                : alert("please select only pdf or Docx"),
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
    <section className='contact-form career-form' id={id}>
      <div className='container'>
        <div className='contatc-main'>
          <div className='contact-left'>
            <img
              src={
                strapi.strapihost +
                userDetails?.data.attributes.upload_form_title.data.attributes.Left.Image.data.attributes.url
              }
              alt={
                userDetails?.data.attributes.upload_form_title.data.attributes.Left.Image.data.attributes
                  .alternativeText
              }
            />
            <div className='caption'>
              <div className='type5'>{userDetails?.data.attributes.upload_form_title.data.attributes.Left.Title}</div>
              <RichText
                htmlContent={userDetails?.data.attributes.upload_form_title.data.attributes.Left.Description}
              ></RichText>
            </div>
          </div>
          <div className='contact-right'>
            <h5>{userDetails?.data.attributes.upload_form_title.data.attributes.RightHead.Title}</h5>
            <RichText
              htmlContent={userDetails?.data.attributes.upload_form_title.data.attributes.RightHead.Description}
            ></RichText>
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
              <div className='career-top' id='UploadBox'>
                <img
                  src={
                    strapi.strapihost +
                    userDetails?.data.attributes.upload_form_title.data.attributes.Right.Image.data.attributes.url
                  }
                  alt={
                    userDetails?.data.attributes.upload_form_title.data.attributes.Right.Image.data.attributes
                      .alternativeText
                  }
                />
                <div className='career-figcaption'>
                  <div className='career-fig-left'>
                    <h6>{userDetails?.data.attributes.upload_form_title.data.attributes.Right.Title}</h6>
                    <RichText
                      htmlContent={userDetails?.data.attributes.upload_form_title.data.attributes.Right.Description}
                    ></RichText>
                  </div>
                  <div className='career-fig-right'>
                    <div className='upload-btn-wrapper'>
                      <button type='button' id='resumeBtn' className='btn'>
                        Upload Resume
                      </button>
                      <input
                        type='file'
                        accept='application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                        name='myfile'
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            if (e.target.files[0].size > 1 * 1000 * 1024) {
                              alert("File with maximum size of 1MB is allowed");
                              return false;
                            }
                            setResumePath(e.target.value);
                          }
                        }}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className='row'>
                <div className='col'>
                  <div className='form-floating form-group'>
                    <input
                      type='text'
                      className='form-control'
                      id='CandidateFName'
                      placeholder='First Name'
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                    <label htmlFor='CandidateFName'>First Name</label>
                  </div>
                </div>
                <div className='col'>
                  <div className='form-floating form-group'>
                    <input
                      type='text'
                      className='form-control'
                      id='CandidateLName'
                      placeholder='Last Name'
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                    <label htmlFor='CandidateLName'>Last Name</label>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col'>
                  <div className='form-floating form-group'>
                    <input
                      type='email'
                      className='form-control'
                      id='CandidateEmail'
                      placeholder='Email'
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <label htmlFor='CandidateEmail'>Email</label>
                  </div>
                </div>
                <div className='col'>
                  <div className='form-floating form-group'>
                    <input
                      type='phone'
                      className='form-control'
                      id='CandidatePhone'
                      placeholder='Phone Number'
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                    <label htmlFor='CandidatePhone'>Phone Number</label>
                  </div>
                </div>
              </div>
              <div className='form-floating form-group'>
                <input
                  type='text'
                  className='form-control'
                  id='CandidateHyperLink1'
                  placeholder='Hyperlink'
                  onChange={(e) => setHyperLink(e.target.value)}
                  required
                />
                <label htmlFor='CandidateHyperLink1'>Hyperlink</label>
              </div>
              <button
                type='submit'
                id='CarreerApplicationSubmit'
                data-form-name='CareerFormData'
                className='btn btn-defualt btn-block'
              >
                Submit{" "}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
