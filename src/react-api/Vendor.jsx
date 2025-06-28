import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  cityRequest,
  currencyRequest,
  createRequest,
  updateRequest,
  countryRequest,
} from "../Redux/Action/LoginAction";
import UpdateForm from "./UpdateForm";
import VendorContact from "./VendorContact";
import "react-toastify/dist/ReactToastify.css";
import "./Vendor.css";

const Vendor = ({ setTable }) => {
  const dispatch = useDispatch();

  const fetch = useSelector((state) => state.user.editObj);
  const currencyList = useSelector((state) => state.currency.currencyData?.data || []);
  const createSuccess = useSelector((state) => state.user.createSuccess);
  const updateSuccess = useSelector((state) => state.user.updateSuccess);
  const apiError = useSelector((state) => state.user.error);

  const [focuseItem, setFocuseItem] = useState("BASIC INFORMATION");
  const [isUpdated, setIsUpdated] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [contactSubmitClicked, setContactSubmitClicked] = useState(false);
  const [contactListFromTick, setContactListFromTick] = useState(null);

  const [formData, setFormdata] = useState({
    countryId: "",
    cityId: "",
    contactList: [
      { name: "", email: "", mobileNo: "", isDefault: undefined, id: null },
    ],
    vendorName: "",
    vendorCode: "",
    vendorType: "",
    taxRegNo: "",
    companyRegNo: "",
    address1: "",
    address2: "",
    postalCode: "",
    createdBy: localStorage.getItem("userId") || "",
    documentList: [],
    id: null,
    bankAcctName: "",
    bankBranchName: "",
    bankAccountNum: "",
    bankName: "",
    bankSwiftCode: "",
    currencies: "",
    defaultCurrencyId: "",
  });

  const hasPatched = useRef(false);

  useEffect(() => {
    dispatch(currencyRequest());
    dispatch(countryRequest());
  }, [dispatch]);

  useEffect(() => {
    if (fetch && !hasPatched.current) {
      hasPatched.current = true;
      const currencyObj = currencyList.find((cur) => cur.id === fetch.defaultCurrencyId);
      const updatedForm = {
        ...fetch,
        countryId: fetch.country || "",
        cityId: fetch.cityId || "",
        currencies: currencyObj?.code || "",
        contactList: (fetch.contactList || []).map((item) => ({
          ...item,
          isDefault: item.isDefault ?? undefined,
        })),
        createdBy: fetch.createdBy || localStorage.getItem("userId") || "",
      };
      setFormdata(updatedForm);
      if (fetch.country) dispatch(cityRequest());
      if (localStorage.getItem("vendorFetched") === "true") {
        toast.success("Vendor fetched successfully", { position: "top-right" });
        localStorage.removeItem("vendorFetched");
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
    contactList: contactListFromTick || data.contactList || [],
  });

  const handleSave = () => {
    setShowErrors(true);
    setContactSubmitClicked(true);

    const isEdit = !!formData.id;
    const contactList = contactListFromTick || formData.contactList;

    const contactFilled = contactList.some(
      (c) => c.name?.trim() || c.email?.trim() || c.mobileNo?.trim()
    );

    const isBasicMissing =
      !formData.vendorName ||
      !formData.vendorCode ||
      !formData.vendorType ||
      !formData.companyRegNo ||
      !formData.defaultCurrencyId ||
      !formData.countryId ||
      !formData.cityId;

    const isContactMissing = contactList.some(
      (c) => !c.name?.trim() || !c.email?.trim() || !c.mobileNo?.trim()
    );

    const defaultCount = contactList.filter((c) => c.isDefault === true).length;
    const firstIsDefaultNo = defaultCount !== 1;

    if (!isEdit) {
      if (isBasicMissing && (!contactFilled || isContactMissing)) {
        toast.error("Fill the values in basic information and contact", { position: "top-right" });
        return;
      }

      if (isBasicMissing) {
        toast.error("Some values missing in basic information", { position: "top-right" });
        return;
      }

      if (contactFilled && isContactMissing) {
        toast.error("Some values missing in contact", { position: "top-right" });
        return;
      }

      if (firstIsDefaultNo) {
        toast.error("Choose exactly one contact as default", { position: "top-right" });
        return;
      }
    } else {
      if (isUpdated && isBasicMissing) {
        toast.error("Some values missing in basic information", { position: "top-right" });
        return;
      }

      if (contactFilled && isContactMissing) {
        toast.error("Some values missing in contact", { position: "top-right" });
        return;
      }

      if (contactFilled && firstIsDefaultNo) {
        toast.error("Choose exactly one contact as default", { position: "top-right" });
        return;
      }

      if (!isUpdated && !contactFilled) {
        toast.info("No changes made to update", { position: "top-right" });
        return;
      }
    }

    const payload = generatePayload({
      ...formData,
      contactList,
    });

    if (isEdit) {
      dispatch(updateRequest({ id: formData.id, data: payload }));
    } else {
      dispatch(createRequest(payload));
    }

    setIsUpdated(false);
    setContactSubmitClicked(false);
  };

  useEffect(() => {
    if (createSuccess) {
      toast.success("Vendor created successfully", { position: "top-right" });
    }
  }, [createSuccess]);

  useEffect(() => {
    if (updateSuccess) {
      toast.success("Vendor updated successfully", { position: "top-right" });
    }
  }, [updateSuccess]);

  useEffect(() => {
    if (apiError) {
      toast.error(apiError.message || "Failed to save vendor", { position: "top-right" });
    }
  }, [apiError]);

  const menuItems = [
    {
      label: "BASIC INFORMATION",
      content: (
        <UpdateForm
          formData={formData}
          setFormdata={handleInputChange}
          setIsUpdated={setIsUpdated}
          showErrors={showErrors}
        />
      ),
      command: () => setFocuseItem("BASIC INFORMATION"),
    },
    {
      label: "CONTACT DETAILS",
      content: (
        <VendorContact
          formData={formData}
          setFormdata={handleInputChange}
          showErrors={showErrors}
          contactSubmitClicked={contactSubmitClicked}
          setContactSubmitClicked={setContactSubmitClicked}
          isEditMode={true}
          setContactListFromTick={setContactListFromTick}
        />
      ),
      command: () => setFocuseItem("CONTACT DETAILS"),
    },
  ];

  return (
    <div>
      <div className="go-back-container">
        <button className="btn btn-secondary" onClick={() => setTable("vendor")}>
          <FaArrowLeft style={{ marginRight: "5px" }} /> Go Back
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

      <div className="save-button-container" style={{ paddingBottom: "50px" }}>
        <button
          type="submit"
          className="save-btn float-end"
          onClick={handleSave}
          disabled={
            !isUpdated &&
            !(contactListFromTick?.some(
              (c) => c.name?.trim() || c.email?.trim() || c.mobileNo?.trim()
            ))
          }
        >
          {formData.id ? "UPDATE" : "SAVE"}
        </button>
      </div>
    </div>
  );
};

export default Vendor;
