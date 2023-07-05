import { useState, useEffect } from 'react'

const ToDoTaskFromModal = ({ editTaskId, reload }) => {
    const [loadingModal, setLoadingModal] = useState(true);
    const [modalText, setModalText] = useState({});

    useEffect(() => {
        async function fetchData() {
            if (editTaskId === '') {
                setModalText({ modalTitle: "Add new task",  title: '', content: ''  });
                setLoadingModal(false);
            }
            else {
                const response = await fetch(`/api/todo/${editTaskId}`);
                if (response.status >= 200 && response.status < 300) {
                    let data = await response.json();
                    setModalText({ modalTitle: "Edit this task", title: data.title, content: data.content  });
                    setLoadingModal(false);
                } else {
                    console.log('Somthing happened wrong');
                } 
            }
        }
        fetchData();
    }, [editTaskId]);

    const handleInput = e => {
        let target_key = e.currentTarget.id;
        setModalText((prevState) => { return { ...prevState, [target_key]: e.target.value } });
    }

    const handleSubmit = event => {
        event.preventDefault();
        if (editTaskId === '') {
            fetch('/api/todo', { method: "post", body: JSON.stringify({ title: modalText.title, content: modalText.content }), headers: { 'content-type': 'application/json' }, }).then(response => {
                if (response.status >= 200 && response.status < 300) {
                    document.getElementsByClassName("btn-close")[0].click();
                    reload((i) => i + 1);
                } else {
                    console.log('Somthing happened wrong');
                }

            }).catch(err => err);
        } else {
            fetch(`/api/todo`, { method: "put", body: JSON.stringify({ id: editTaskId, title: modalText.title, content: modalText.content }), headers: { 'content-type': 'application/json' }, }).then(response => {
                if (response.status >= 200 && response.status < 300) {
                    document.getElementsByClassName("btn-close")[0].click();
                    reload((i) => i + 1);
                } else {
                    console.log('Somthing happened wrong');
                }

            }).catch(err => err);
        }
    };

    return loadingModal == true ? <i>Loading...</i> : (
        <div id="taskFormModal" className="modal fade" tabIndex="-1" aria-labelledby="taskFormModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    
                    <form method="post" onSubmit={handleSubmit}>
                        <div className="modal-header" >
                            <h5 className="modal-title" id="taskFormModalLabel">{modalText.modalTitle}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div >
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" className="form-control" id="title" value={modalText.title} placeholder="Write task's name here" onChange={e => handleInput(e)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="content" className="form-label">Content</label>
                                <textarea className="form-control" id="content" rows="3" value={modalText.content} onChange={e => handleInput(e)}></textarea>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary">Save changes</button>
                        </div>
                    </form >
                </div>
            </div>
        </div>);
}

export default ToDoTaskFromModal;