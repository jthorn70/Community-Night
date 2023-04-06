import { Table, Link } from "@nextui-org/react";
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

export default function UserTable() {

    const [user, setUser] = useState([]);
    const [userName, setUserName] = useState('test');
    const [filteredEvents, setFilteredEvents] = useState([]);
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
    const supabase = createClient(supabaseUrl, supabaseKey);

    useEffect(() => {
        const fetchEvents = async () => {
            let { data, error } = await supabase
                .from('Submissions')
                .select('*')
                .eq('name', 'test');
            if (error) console.log('error', error);
            else {
                setUser(data);
                // console.log(data)
            }
        };
        fetchEvents();
    }, []);

    useEffect(() => {
        setFilteredEvents(
            user.filter((user) => (userName ? user.userName === userName : true))
        );
    }, [user, userName]);


    const columns = [
        {
            key: 'name',
            label: 'Name',
        },
        {
            key: 'link',
            label: 'Link',
        },
        {
            key: 'description',
            label: 'Description',
        },
        {
            key: 'category',
            label: 'Category',
        },

    ];

    return (
        <Table
            lined
            headerLined
            color={'secondary'}
            selectionMode="multiple"
            aria-label="Submission Form Table">
            <Table.Header columns={columns}>
                {(column) => <Table.Column key={column.key}>{column.label}</Table.Column>}
            </Table.Header>
            <Table.Body items={user}>
                {(item) => (
                    <Table.Row key={item.id}>
                        {(columnKey) =>
                            columnKey === 'link' ? (
                                <Table.Cell>
                                    <Link href={item[columnKey]} target="_blank" rel="noopener noreferrer">
                                        {item[columnKey]}
                                    </Link>
                                </Table.Cell>
                            ) : (
                                <Table.Cell>{item[columnKey]}</Table.Cell>
                            )
                        }
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    )
}