import React from 'react'
import { Link } from 'react-router-dom';

class Brand extends React.Component {
    render() {
        return (
            <div className="brand">
            <Link className="desktop-toggler" onClick={this.props.onClick}>
                <button type="button" className="menu-toggler" data-toggle="sidebar-minify">                   
                    <span className="bar" />
                    <span className="bar" />             
                </button>
            </Link>
            <Link className="brand-logo" to='/'>
                LOGO
            </Link>
            
        </div>
        );
    }
}

export default Brand;