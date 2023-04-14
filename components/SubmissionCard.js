import React, { useState } from 'react';
import { Grid, Table, Link } from '@nextui-org/react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function SubmissionCard({ videoUrl, username, videoDesc, videoCat }) {

    return (
        <Grid.Container justify='center' gap={2}>
            <Grid justify='center' >
                <Table
                    aria-label="Example table with static content"
                    css={{
                        height: "auto",
                        minWidth: "100%",
                    }}
                >
                    <Table.Header>
                        <Table.Column>NAME</Table.Column>
                        <Table.Column>LINK</Table.Column>
                        <Table.Column>DESCRIPTION</Table.Column>
                        <Table.Column>CATEGORY</Table.Column>

                    </Table.Header>
                    <Table.Body>
                        <Table.Row key="1">
                            <Table.Cell>{username}</Table.Cell>
                            <Table.Cell><Link href={videoUrl} target="_blank" rel="noopener noreferrer">
                                {videoUrl}
                            </Link></Table.Cell>
                            <Table.Cell>{videoDesc}</Table.Cell>

                            <Table.Cell>{videoCat}</Table.Cell>

                        </Table.Row>

                    </Table.Body>
                </Table>
            </Grid>
        </Grid.Container>
    );
}
