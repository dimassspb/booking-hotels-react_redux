import { DatePicker, Select } from "antd";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { SearchOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;
const { Option } = Select;

const Search = () => {
    // state
    const [location, setLocation] = useState("");
    // console.log("location:", location);
    const [date, setDate] = useState("");
    const [bed, setBed] = useState("");

    // route
    const history = useHistory();

    const handleSubmit = async (e) => {
        history.push(`/search?location=${location}&date=${date}&bed=${bed}`);
    };

    const handleChange = (e) => {
        e.preventDefault();
        setLocation(e.target.value);
    };

    return (
        <div className='d-flex pb-4'>
            <div className='w-100'>
                <input
                    type='text'
                    name='location'
                    defaultValue={location}
                    onChange={handleChange}
                    placeholder='Location'
                    className='form-control'
                    style={{ height: "50px" }}
                />
            </div>
            <RangePicker
                className='w-100'
                onChange={(value, dateString) => setDate(dateString)}
                disabledDate={(current) =>
                    current && current.valueOf() < moment().subtract(1, "days")
                }
            />
            <Select
                onChange={(value) => setBed(value)}
                className='w-100'
                size='large'
                placeholder='Number of Beds'
            >
                <Option key={1}>{1}</Option>
                <Option key={2}>{2}</Option>
                <Option key={3}>{3}</Option>
                <Option key={4}>{4}</Option>
            </Select>
            <SearchOutlined
                className='btn btn-primary p-3 btn-square'
                onClick={handleSubmit}
            />
        </div>
    );
};

export default Search;
