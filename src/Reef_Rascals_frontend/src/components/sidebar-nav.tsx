import '../scss/components/sidebar-nav.scss';

export default function SidebarNav() {
    function toggleSidebar() {

    }

    return (
        <div className="sidebar-container" onMouseOver={toggleSidebar} onMouseOut={toggleSidebar}>
            <div className="sidebar-menu">
                <a href="/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M11.3 3.3a1 1 0 0 1 1.4 0l6 6l2 2a1 1 0 0 1-1.4 1.4l-.3-.3V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3c0 .6-.4 1-1 1H7a2 2 0 0 1-2-2v-6.6l-.3.3a1 1 0 0 1-1.4-1.4l2-2z" clip-rule="evenodd"/></svg>
                    <p>Home</p>
                </a>
                <a href="/marketplace">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2m-8 4c0 .55-.45 1-1 1s-1-.45-1-1V8h2zm2-6c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2m4 6c0 .55-.45 1-1 1s-1-.45-1-1V8h2z"/></svg>
                    <p>Marketplace</p>
                </a>
                <a href="/aquarium">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M10.357 4.103c-1.001 1.001-1.58 2.335-1.912 3.673c-.333 1.344-.431 2.747-.43 3.95a.327.327 0 0 1-.322.323c-1.771.007-4.016.22-5.832 1.087c-.682.326-.967.998-.826 1.635c.133.596.615 1.085 1.267 1.244c.795.194 1.717.445 2.519.73c.401.142.76.288 1.052.434c.302.152.487.28.578.372c.091.09.22.275.371.577c.146.292.292.65.434 1.051c.284.801.534 1.723.728 2.517c.159.652.648 1.135 1.245 1.267c.637.142 1.309-.143 1.635-.825c.867-1.813 1.08-4.054 1.09-5.823c0-.174.147-.321.323-.321c1.202 0 2.606-.098 3.95-.431c1.34-.333 2.674-.912 3.676-1.914c1.12-1.12 1.668-2.609 1.917-4.056c.25-1.451.209-2.926.095-4.092a3.771 3.771 0 0 0-3.41-3.41c-1.166-.113-2.64-.154-4.092.095c-1.447.25-2.936.798-4.056 1.917M16 5a1 1 0 1 1 0 2a1 1 0 0 1 0-2"/></svg>
                    <p>Contact</p>
                </a>
                <a href="/profile/1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M12 4a8 8 0 0 0-6.96 11.947A4.99 4.99 0 0 1 9 14h6a4.99 4.99 0 0 1 3.96 1.947A8 8 0 0 0 12 4m7.943 14.076A9.959 9.959 0 0 0 22 12c0-5.523-4.477-10-10-10S2 6.477 2 12a9.958 9.958 0 0 0 2.057 6.076l-.005.018l.355.413A9.98 9.98 0 0 0 12 22a9.947 9.947 0 0 0 5.675-1.765a10.055 10.055 0 0 0 1.918-1.728l.355-.413zM12 6a3 3 0 1 0 0 6a3 3 0 0 0 0-6" clip-rule="evenodd"/></svg>
                    <p>Profile</p>
                </a>
            </div>
        </div>
    )
}