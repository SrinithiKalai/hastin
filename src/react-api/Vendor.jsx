import React, { useEffect, useState, useRef } from "react";
import UpdateForm from "./UpdateForm";
import VendorContact from "./VendorContact";
import { useDispatch, useSelector } from "react-redux";
import {
  createRequest,
  updateRequest,
  getIdRequest,
  cityRequest,
  currencyRequest,
} from "../Redux/Action/LoginAction";
import "./FormUpdate.css";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Vendor = ({ setTable }) => {
  const dispatch = useDispatch();
  const fetch = useSelector((state) => state.user.editObj);
  const currencyList = useSelector(
    (state) => state.currency.currencyData?.data || []
  );

  const [focuseItem, setFocuseItem] = useState("BASIC INFORMATION");
  const [isUpdated, setIsUpdated] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  const [formData, setFormdata] = useState({
    countryId: "",
    cityId: "",
    contactList: [
      {
        name: "",
        email: "",
        mobileNo: "",
        isDefault: undefined,
        id: null,
      },
    ],
    vendorName: "",
    vendorCode: "",
    vendorType: "",
    taxRegNo: "",
    companyRegNo: "",
    address1: "",
    address2: "",
    postalCode: "",
    createdBy: "",
    documentList: [],
    id: null,
    bankAcctName: "",
    bankBranchName: "",
    bankAccountNum: "",
    bankName: "",
    bankSwiftCode: "",
    currencies: "",
  });

  const hasPatched = useRef(false);

  useEffect(() => {
    dispatch(currencyRequest());
  }, [dispatch]);

  useEffect(() => {
    if (fetch && !hasPatched.current) {
      hasPatched.current = true;

      const currencyObj = currencyList.find(
        (cur) => cur.id === fetch.defaultCurrencyId
      );

      const updatedForm = {
        ...fetch,
        countryId: fetch.country || "",
        cityId: fetch.cityId || "",
        currencies: currencyObj?.code || "",
        contactList: (fetch.contactList || []).map((item) => ({
          ...item,
          isDefault: item.isDefault ?? undefined,
        })),
      };

      setFormdata(updatedForm);

      if (fetch.country) {
        dispatch(cityRequest());
      }
    }
  }, [fetch, currencyList, dispatch]);

  const handleInputChange = (updatedData) => {
    setFormdata(updatedData);
    setIsUpdated(true);
  };

  const generatePayload = (data) => ({
    ...data,
    country: data.countryId || null,
    city: data.cityId || null,
    contactList: data.contactList?.length > 0 ? data.contactList : [],
  });

  const isValidForm = () => {
    const requiredFields = ["vendorName", "vendorCode", "vendorType", "countryId", "cityId"];
    const hasEmpty = requiredFields.some((field) => !formData[field]);

    const contactValid = formData.contactList.every(
      (c) => c.name && c.email && c.mobileNo
    );

    return !hasEmpty && contactValid;
  };

  const handleSave = () => {
    setShowErrors(true);

    if (!isValidForm()) return;

    const payload = generatePayload(formData);

    if (formData.id) {
      dispatch(updateRequest({ id: formData.id, data: payload }));
      toast.success("Vendor updated successfully");
    } else {
      dispatch(createRequest(payload));
      dispatch(getIdRequest());
      toast.success("Vendor saved successfully");
    }

    setIsUpdated(false);
  };

  const menuItems = [
    {
      label: "BASIC INFORMATION",
      content: (
        <div className="content">
          <UpdateForm
            formData={formData}
            setFormdata={handleInputChange}
            setIsUpdated={setIsUpdated}
            showErrors={showErrors}
          />
        </div>
      ),
      command: () => setFocuseItem("BASIC INFORMATION"),
    },
    {
      label: "CONTACT DETAILS",
      content: (
        <div className="content">
          <VendorContact
            formData={formData}
            setFormdata={handleInputChange}
            showErrors={showErrors}
          />
        </div>
      ),
      command: () => setFocuseItem("CONTACT DETAILS"),
    },
  ];

  return (
    <div>
      <div style={{ paddingRight: "20px" }}>
        <button className="btn btn-secondary float-end" onClick={() => setTable("vendor")}>
          <FaArrowLeft style={{ marginRight: "5px" }} />
          Go Back
        </button>
      </div>

      <div className="vertical-menu-container">
        {menuItems.map((item, index) => (
          <div key={index} className="mb-4 vertical-menu">
            <button
              className={`menu-item ${focuseItem === item.label ? "active" : ""}`}
              onClick={item.command}
            >
              {item.label}
            </button>
            {focuseItem === item.label && item.content}
          </div>
        ))}
      </div>

      <div
        className="save-button-container"
        style={{ paddingRight: "20px", paddingBottom: "50px" }}
      >
        <button
          type="submit"
          className="save-btn float-end"
          onClick={handleSave}
          disabled={!isUpdated}
        >
          {formData.id ? "UPDATE" : "SAVE"}
        </button>
      </div>
    </div>
  );
};

export default Vendor;
