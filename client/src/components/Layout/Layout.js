import Header from './Header'
import Footer from './Footer'
import { Helmet } from 'react-helmet'

const Layout = ({ children, title, description, keyword, auther}) => {
    return (
        <div>
            <Helmet>
                <meta charSet="UTF-8" />
                <meta name="description" content={description}/>
                <meta name="keywords" content={keyword} />
                <meta name="author" content={auther} />
                <title>{title}</title>
            </Helmet>
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

Layout.defaultProps = {
    title : "Ecommerce app",
    description : 'mern stack project',
    keyword :"mern, node, mongodb, rect",
    auther:'Antra talaviya'
}

export default Layout
