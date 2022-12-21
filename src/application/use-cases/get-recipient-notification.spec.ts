import { makeNotification } from "../../../test/factories/notification-factory";
import { InMemoryNotificationsRepository } from "../../../test/repositories/in-memory-notifications-repository";
import { Content } from "../entities/content";
import { Notification } from "../entities/notification";
import { GetRecipientNotification } from "./get-recipient-notification";

describe('Get recipient notifications', () => {
    it('should be able to get recipient notifications', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const getRecipientNotification = new GetRecipientNotification(notificationsRepository);

        const notification = new Notification({
            category: 'social',
            content: new Content('Nova solicitação de amizade!'),
            recipientId: 'example-recipient-id',
        });

        await notificationsRepository.create(
            makeNotification({recipientId: 'recipient-1'})
        );

        await notificationsRepository.create(
            makeNotification({recipientId: 'recipient-1'})
        );

        await notificationsRepository.create(
            makeNotification({recipientId: 'recipient-2'})
        );

        const { notifications } = await getRecipientNotification.execute({
            recipientId: 'recipient-1',
        });
        
        expect(notifications).toHaveLength(2);
        expect(notifications).toEqual(expect.arrayContaining([
            expect.objectContaining({ recipientId: 'recipient-1' }),
            expect.objectContaining({ recipientId: 'recipient-1' }),
        ]))
    });
});