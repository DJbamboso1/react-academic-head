import React from 'react';
import { Link } from 'react-router-dom';

class Toggle extends React.Component {
    render() {
        return (
            <div className="mobile-toggler" >
                    <button type="button" className="menu-toggler" data-toggle="sidebar-mobile">
                        <Link to="#" onClick={this.props.onClickShowSideBar}>
                            <span className="bar" />
                            <span className="bar" />
                        </Link>

                    </button>
                    {/* <Link to="#" button type='button' className="menu-toggler" data-toggle="sidebar-mobile" onClick={showSidebar.bind(this)}>
                        
                            <span className="bar" />
                            <span className="bar" />
                        

                    </Link> */}

                </div>
        );
    }
}

export default Toggle;