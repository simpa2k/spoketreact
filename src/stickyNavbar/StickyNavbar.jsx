import React from 'react';
import HeadingList from './list/HeadingList.jsx';
import SocialMediaList from './list/SocialMediaList.jsx';
import SocialMediaText from './SocialMediaText.jsx';

import offset from './functions/offset.js';

class StickyNavbar extends React.Component {

    constructor(props) {

        super(props);
        this.expanded = false;
        this.fixatedAtElement = true;

        this.state = {};

        this.resizeListener = this.resizeListener.bind(this);
        this.navbarPositionListener = this.navbarPositionListener.bind(this);
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.setNavbarHeight = this.setNavbarHeight.bind(this);

        this.appendSocialMediaText = this.appendSocialMediaText.bind(this);
        this.removeSocialMediaText = this.removeSocialMediaText.bind(this);

    }

    componentDidMount() {

        if (this.props.elementToStickToY === 0) {

            this.navbar.style.position = 'static';
            window.addEventListener('resize', this.setNavbarHeight);

        } else {
            window.addEventListener('resize', this.resizeListener);
            window.addEventListener('scroll', this.navbarPositionListener);

            this.collapsedNavbarHeight = this.navbar.clientHeight;
            this.expandedNavbarHeight = this.container.clientHeight;
        }
    }

    componentWillUnmount() {

        window.removeEvent('scroll', this.navbarPositionListener);
        window.removeEvent('resize', this.resizeListener);

    }

    /*
     * If the navbar height is not constantly checked on resize
     * the .container-fluid might get bigger than the navbar, resulting in ugliness.
     * The position of the navbar might also change if it gets smaller, resulting in it
     * being placed above the element that it should stick to.
     */
    resizeListener() {

        this.setNavbarHeight();
        this.checkNavbarUpperEdge();
        this.checkNavbarLowerEdge();

        if (window.innerWidth >= 931 && this.navbar.classList.contains('expanded')) {
            this.toggleNavbar();
        }

        this.setNavbarLowerEdgeY();
    }

    navbarPositionListener() {

        const navbar = this.navbar;
        const topOfWindowAlignsWithTopOfNavbar = window.scrollY > (this.props.elementToStickToY - navbar.clientHeight);

        if (topOfWindowAlignsWithTopOfNavbar) {
            this.fixateElementPositionTop(navbar, navbar.clientHeight);
        } else {
            this.fixateElementPositionBottom(navbar, this.props.elementToStickToY);
        }

        this.setNavbarLowerEdgeY();
    }

    setNavbarLowerEdgeY() {

        const navbarOffset = offset(this.navbar).top;
        this.setState({navbarLowerEdgeY: navbarOffset + this.navbar.clientHeight});
    }

    fixateElementPositionTop(navbar, navbarHeight) {

        this.setState({fixatedAtElement: false});

        navbar.style.zIndex = '10';
        navbar.style.position = 'fixed';
        navbar.style.top = '0';
        navbar.style.height = String(navbarHeight) + 'px';

    }

    fixateElementPositionBottom(navbar, elementToStickToY) {

        this.setState({fixatedAtElement: true});

        navbar.style.zIndex = '10';
        navbar.style.position = 'absolute';
        navbar.style.bottom = String(elementToStickToY);
        navbar.style.top = '';

    }

    /*
     * Sets the enclosing nav element's height to that of the enclosed .container-fluid,
     * which is what is actually taking the size and padding/margin of the <p>'s or <a>'s into account
     */
    setNavbarHeight() {

        const correctHeight = this.container.clientHeight;

        if (this.navbar.classList.contains('expanded')) {

            this.expandedNavbarHeight = correctHeight;
            this.navbar.style.height = String(this.expandedNavbarHeight) + 'px';

        } else {

            this.collapsedNavbarHeight = correctHeight;
            this.navbar.style.height = String(this.collapsedNavbarHeight) + 'px';

        }
    }

    /*
     * If the navbar is expanded so that its upper edge
     * is off screen, the window has to be scrolled up to account
     * for this.
     */
    checkNavbarUpperEdge() {

        const navbarY = offset(this.navbar).top;

        if (navbarY < window.scrollY) {
            window.scrollTo(0, navbarY);
        }
    }

    /*
     * If the navbar is fixed to the top and it's height changes so that it
     * still is fixed to the top, despite the lower edge hanging above the element
     * that it should stick to, it has to be moved down.
     */
    checkNavbarLowerEdge() {

        const elementBottom = offset(this.navbar).top + this.navbar.clientHeight;

        if (elementBottom < this.props.elementToStickToY) {
            this.fixateElementPositionBottom(this.navbar, this.props.elementToStickToY);
        }
    }

    toggleNavbar() {

        const navbarButton = this.navbarBtn;

        if (this.navbar.classList.contains('expanded')) {

            this.navbar.classList.remove('expanded');
            this.navbar.style.height = String(this.collapsedNavbarHeight) + 'px';

            this.checkNavbarLowerEdge();

            navbarButton.classList.remove('active');

        } else {

            this.navbar.classList.add('expanded');
            this.expandedNavbarHeight = this.container.clientHeight;
            this.navbar.style.height = String(this.expandedNavbarHeight) + 'px';

            this.checkNavbarUpperEdge();

            navbarButton.classList.add('active');
        }
    }

    appendSocialMediaText(event, textImagePath) {

        const clickedElement = event.currentTarget;

        const distance = this.state.fixatedAtElement ? -50 : 50;
        const top = offset(clickedElement).top + distance;
        const style = {
            top: top,
            left: offset(clickedElement).left
         };

        const imageTextElement = React.createElement(
            'img',
            {
                className: 'social-media-text',
                src: textImagePath,
                style: style
            }
        );

        this.setState({socialMediaText: imageTextElement});

    }

    removeSocialMediaText() {
        this.setState({socialMediaText: null});
    }

    render() {

        return (

            <div>
                <nav id="navbar" ref={(navbar) => { this.navbar = navbar; }}>
                    <div className="container-fluid parent" ref={(container) => { this.container = container; }}>
                        <a className="navbar-brand"></a>

                        <HeadingList classes={'navbar-text'} items={this.props.headings} />

                        <div id="social-media-section">
                            <SocialMediaList
                                classes={'social-media'}
                                items={this.props.socialMedia}
                                mouseOver={this.appendSocialMediaText}
                                mouseOut={this.removeSocialMediaText}
                            />
                        </div>

                        <button id="navbar-button" type="button" className="btn btn-default"
                                onClick={this.toggleNavbar}
                                ref={(navbarBtn) => { this.navbarBtn = navbarBtn; }}>
                            <span className="glyphicon glyphicon-menu-hamburger"></span>
                        </button>
                    </div>
                </nav>
            </div>

        );
        //<SocialMediaText text={this.state.socialMediaText} />
    }
}

export default StickyNavbar;
