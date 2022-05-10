import React from 'react';
import { Formik, Form, FieldArray, Field } from 'formik';

const initialValues = {
  items: [
    {
      description: 'item1',
      unitPrice: 100,
      quantity: 1,
      gst: 15,
      total: 115
    },
    {
      description: 'item2',
      unitPrice: 100,
      quantity: 1,
      gst: 15,
      total: 115
    },
    {
      description: 'item3',
      unitPrice: 100,
      quantity: 1,
      gst: 15,
      total: 115
    },
  ],
};

function updateFieldsBySetValue(setValues: any) {
  setValues((s: any) => {
    const items = s.items
    const updated: any = items.map((item: any, index: number) => {
      const quantity = item.quantity + 1
      const {gst, total }= calcTotalAndGst(item, quantity)

      return Object.assign({}, item, { quantity, gst, total})
    })

    s.items = updated
    return Object.assign({}, s)
  })
}

const calcTotalAndGst = (item: any, quantity: number) => {
  const {unitPrice} = item
  const gst = unitPrice * quantity * 0.15
  const subtotal = unitPrice * quantity
  const total = subtotal + gst

  return { gst, total}
}

function updateFieldsBySetFieldValue(e: any, item: any, index:number, setFieldValue: any, handleChange: any) {

  const quantity = e.target.value

  const {gst, total} = calcTotalAndGst(item, quantity)

  setFieldValue(`items.${index}.gst`, gst)
  setFieldValue(`items.${index}.total`, total)

  handleChange(e)
}

const InviteFriends: React.FC = () => {

  return (
  <div>
    <h1>Items</h1>
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {({ values, setValues, setFieldValue, handleChange }) => {

        return (
        <Form>
          <FieldArray name="items">
            {({ insert, remove, push }) => (
              <div>
                {values.items.length > 0 &&
                  values.items.map((item, index) => (
                    <div className="row" key={index}>
                      <div className="col">
                        <label htmlFor={`items.${index}.description`}>Description</label>
                        <Field
                          name={`items.${index}.description`}
                          placeholder="Item name"
                          type="text"
                        />
                      </div>
                      <div className="col">
                        <label htmlFor={`items.${index}.unitPrice`}>Unit Price</label>
                        <Field
                          name={`items.${index}.unitPrice`}
                          placeholder="100"
                          type="number"
                        />
                      </div>
                      <div className="col">
                        <label htmlFor={`items.${index}.quantity`}>Qty</label>
                        <Field
                          name={`items.${index}.quantity`}
                          placeholder="1"
                          type="number"
                          onChange={(e: any) => { updateFieldsBySetFieldValue(e, item, index, setFieldValue, handleChange) }}>
                        </Field>
                      </div>
                      <div className="col">
                        <label htmlFor={`items.${index}.gst`}>gst</label>
                        <Field
                          name={`items.${index}.gst`}
                          placeholder="15"
                          type="number"
                        />
                      </div>
                      <div className="col">
                        <label htmlFor={`items.${index}.total`}>total</label>
                        <Field
                          name={`items.${index}.total`}
                          placeholder="115"
                          type="number"
                        />
                      </div>
                      <div className="col">
                        <button
                          type="button"
                          className="secondary"
                          onClick={() => remove(index)}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  ))}
                <button
                  type="button"
                  className="secondary"
                  onClick={() => push({ name: '', email: '' })}
                >
                  Add Item
                </button>
              </div>
            )}
          </FieldArray>
          <button type="submit">Invite</button>
          <button type="button" onClick={() => updateFieldsBySetValue(setValues)}>update by setValues</button>
        </Form>
      )}}
    </Formik>
  </div>
)};

export default InviteFriends;
