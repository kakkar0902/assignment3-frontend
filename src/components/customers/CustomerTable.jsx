import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { useOutletContext } from 'react-router-dom';


function CustomerTable() {
    const navigate = useNavigate();
    const { customers, isLoading, error } = useOutletContext();

    if (error) return <p>An error occurred - {error.message}</p>;
    if (isLoading) return <p>Loading...</p>;

    return (
        <div style={{
            background: '#fff',
            borderRadius: 8,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            padding: '2rem',
            margin: '2rem auto',
            maxWidth: 900,
        }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
               {/* <button
                    style={{
                        padding: '0.4rem 1.2rem',
                        background: '#1976d2',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 4,
                        fontWeight: 'bold',
                        fontSize: 15,
                        cursor: 'pointer',
                    }}
                    onClick={() => navigate('/admin/customers/add')}
                >
                    + Add Customer
                </button> */}
                <Link
                style={{
                        padding: '0.4rem 1.2rem',
                        background: '#1976d2',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 4,
                        fontWeight: 'bold',
                        fontSize: 15,
                        cursor: 'pointer',
                    }}
                    to={"/admin/customers/add"}>
                
                    + Add Customer
                </Link>
            </div>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
                <thead>
                    <tr style={{ background: '#f5f7fa' }}>
                        <th style={{ textAlign: 'left', padding: '12px 8px', borderTopLeftRadius: 8 }}>First Name</th>
                        <th style={{ textAlign: 'left', padding: '12px 8px' }}>Last Name</th>
                        <th style={{ textAlign: 'left', padding: '12px 8px' }}>Email</th>
                        <th style={{ textAlign: 'left', padding: '12px 8px' }}>Status</th>
                        <th style={{ textAlign: 'center', padding: '12px 8px' }}>Actions</th>
                        <th style={{ padding: '12px 8px', borderTopRightRadius: 8 }}></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        customers.map((customer, idx) => {
                            return (
                                <tr key={customer.id} style={{ background: idx % 2 === 0 ? '#fafbfc' : '#fff' }}>
                                    <td style={{ padding: '10px 8px', borderBottom: '1px solid #eee' }}>{customer.firstName}</td>
                                    <td style={{ padding: '10px 8px', borderBottom: '1px solid #eee' }}>{customer.lastName}</td>
                                    <td style={{ padding: '10px 8px', borderBottom: '1px solid #eee' }}>{customer.email}</td>
                                    <td style={{ padding: '10px 8px', borderBottom: '1px solid #eee' }}>{customer.status}</td>
                                    <td style={{ padding: '10px 8px', borderBottom: '1px solid #eee', textAlign: 'center' }}>
                                        <button style={{ marginRight: 6, padding: '4px 10px', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, fontWeight: 'bold', fontSize: 13, cursor: 'pointer' }} title="Edit" disabled>
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                        </button>
                                        <button style={{ marginRight: 6, padding: '4px 10px', background: '#d32f2f', color: '#fff', border: 'none', borderRadius: 4, fontWeight: 'bold', fontSize: 13, cursor: 'pointer' }} title="Delete" disabled>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                        <button style={{ padding: '4px 10px', background: '#888', color: '#fff', border: 'none', borderRadius: 4, fontWeight: 'bold', fontSize: 13, cursor: 'pointer' }} title="Details" disabled>
                                            <FontAwesomeIcon icon={faCircleInfo} />
                                        </button>
                                    </td>
                                    <td style={{ padding: '10px 8px', borderBottom: '1px solid #eee' }}></td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default CustomerTable