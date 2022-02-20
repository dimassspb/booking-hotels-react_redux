import { DatePicker, Select } from "antd";
// import "antd/dist/antd.css";
import moment from "moment";

const { Option } = Select;

const HotelCreateForm = ({
    values,
    setValues,
    handleSubmit,
    handleChange,
    handleImageChange,
}) => {
  const {title, location, price, content} = values
    return (
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label className='btn btn-outline-primary btn-block m-2 text-left'>
                    Image
                    <input
                        type='file'
                        name='image'
                        onChange={handleImageChange}
                        accept='image/*'
                        hidden
                    />
                </label>
                <input
                    type='text'
                    name='title'
                    onChange={handleChange}
                    placeholder='Title'
                    className='form-control m-2'
                    value={title}
                />
                <textarea
                    name='content'
                    onChange={handleChange}
                    placeholder='Content'
                    className='form-control m-2'
                    value={content}
                />
                <input
                    type='text'
                    name='location'
                    onChange={handleChange}
                    placeholder='Location'
                    className='form-control m-2'
                    value={location}
                />

                <input
                    type='number'
                    name='price'
                    onChange={handleChange}
                    placeholder='Price'
                    className='form-control m-2'
                    value={price}
                />
                <Select
                    onChange={(value) => setValues({ ...values, bed: value })}
                    className='w-100 m-2'
                    size='large'
                    placeholder='Number of Beds'
                >
                    <Option key={1}>{1}</Option>
                    <Option key={2}>{2}</Option>
                    <Option key={3}>{3}</Option>
                    <Option key={4}>{4}</Option>
                </Select>
            </div>
            <DatePicker
                placeholder='From'
                className='form-control m-2'
                onChange={(date, dateString) =>
                    setValues({ ...values, from: dateString })
                }
                disabledDate={(current) =>
                    current && current.valueOf() < moment().subtract(1, "days")
                }
            />
            <DatePicker
                placeholder='To'
                className='form-control m-2'
                onChange={(date, dateString) =>
                    setValues({ ...values, to: dateString })
                }
                disabledDate={(current) =>
                    current && current.valueOf() < moment().subtract(1, "days")
                }
            />
            <button className='btn btn-primary m-2'>Save</button>
        </form>
    );
};

export default HotelCreateForm;
