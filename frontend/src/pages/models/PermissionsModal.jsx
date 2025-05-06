import React from 'react';
import '../../css/modelscss/PermissionsModal.css'; // Add appropriate styles for the modal

const PermissionsModal = ({ showModal, handleClose, permissions, userPermissions }) => {
    if (!showModal) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h3>User Permissions</h3>
                    <button onClick={handleClose} className="close-btn">&times;</button>
                </div>
                <div className="modal-body">
                    <h4>Permissions Assigned:</h4>
                    <ul>
                        {userPermissions.map((pid) => {
                            const perm = permissions.find((p) => p._id === pid);
                            return (
                                <li key={pid}>
                                    {perm ? perm.name : 'Unknown Permission'}
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="modal-footer">
                    <button onClick={handleClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default PermissionsModal;
