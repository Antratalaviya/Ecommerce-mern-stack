import React, { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Modal, Button } from 'react-bootstrap'

const UpdateCategory = (props) => {
    const [visible, setVisible] = useState(false);
    const [updatedname, setUpdatedname] = useState(props.updatedname);

    //edit controller
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${props.id}`,
                { name: updatedname });
            if (data?.success) {
                toast.success(`${updatedname} is updated`);
                props.getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong")
        }
        setVisible(false);
    }
    return (
        <>
            <Button variant='success' onClick={() => setVisible(true)} >Edit</Button>
            <Modal show={visible} onHide={() => setVisible(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Category</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleUpdate}>
                    <Modal.Body>
                        <input type="text" className="form-control" placeholder='Update Category'
                            value={updatedname}
                            onChange={(e) => setUpdatedname(e.target.value)}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => setVisible(false)}>Cancel</Button>
                        <Button type='submit' variant="dark">Update</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}

export default UpdateCategory
