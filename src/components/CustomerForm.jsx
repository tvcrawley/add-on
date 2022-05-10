import { useState, useCallback } from "react";
import {
    Card,
    TextContainer,
    Form,
    FormLayout,
    Button,
    TextField
} from "@shopify/polaris";
import { Toast, useAppBridge } from "@shopify/app-bridge-react";
import { gql, useMutation } from "@apollo/client";

import { userLoggedInFetch } from "../App";

export function CustomerForm() {
//   const [populateProduct, { loading }] = useMutation(PRODUCTS_QUERY);
//   const [productCount, setProductCount] = useState(0);
const [customerAccountID, setCustomerAccountID] = useState(false);
const [hasResults, setHasResults] = useState(false);

  const app = useAppBridge();
  const fetch = userLoggedInFetch(app);


  const toastMarkup = hasResults && (
    <Toast
      content="Form submitted!"
      onDismiss={() => setHasResults(false)}
    />
  );

  const handleSubmit = (event) => {
    event.preventDefault()
    // todo: once the form is submitted, it should make a request
    // to the backend which in turn will hit the scripttag api

    // todo: should have error handling for empty customerAccountID
    console.log("customerAccountID: ", customerAccountID);
    fetch("/add-script-tag",{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({accountID: customerAccountID})
    })
    .then((res) => res.json())
    .then((data) => {
        console.log("submitted");
        console.log("data: ", data);
        setCustomerAccountID("");
    })

  }

  const handleCustomerAccountIDChange = (value) => setCustomerAccountID(value)

   const handleCancel = useCallback(() => {
        setCustomerAccountID("");
        // todo: if "e" is in input, number won't clear
    }, []);

  console.log(customerAccountID);


  return (
    <>
    <p>We've got a form! Now time to format it correctly</p>
      {toastMarkup}
      <Card title="Howl Account ID" sectioned>
          <TextContainer spacing="loose">
        <Form onSubmit={handleSubmit}>
        <FormLayout>
            {/* <InlineError message="Store name is required" fieldID="myFieldID" /> */}
            <TextField
               value={customerAccountID}
               type="number"
               label=""
               onChange={handleCustomerAccountIDChange}
               autoComplete="off"
            />
            <Button primary submit={true}>Submit</Button>
            <Button onClick={handleCancel}>Cancel</Button>
        </FormLayout>
        </Form>
        </TextContainer>
      </Card>
    </>
  );
}


