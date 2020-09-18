import React from 'react';
import Button from './button';

const Modal = ({content,handleToggle,open,title,handleSubmit,isLoading,error}) => {
  const className=open?'modal open':'modal';
  return (
    <div className={className}  tabIndex="-1" role="dialog" aria-labelledby="m" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" >{title}</h4>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" onClick={handleToggle}>&times;</span>
            </button>
          </div>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="alert alert-danger" hidden={!error}>
                <strong>Error!</strong> {error}
              </div>
              {content}
            </div>
            <div className="modal-footer">
              <button  disabled={isLoading} type="button" className="btn btn-secondary" onClick={handleToggle}>Cancel</button>
              <Button
                isLoading={isLoading}
                text="Submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default  Modal;
