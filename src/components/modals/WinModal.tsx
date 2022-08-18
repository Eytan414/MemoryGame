import React from 'react';
import { View, Text, Modal, Dimensions } from 'react-native';
import {ShareButton} from '../../components/common/ShareButton';
import { DESKTOP_MIN_WIDTH, MODAL_WIDTH_DESKTOP, MODAL_WIDTH_MOBILE } from '../../data/constants';
import { GoHomeButton } from '../common/GoHomeButton';
import { RestartButton } from '../GameGrid/grid/RestartButton';

interface ModalProps{
    level: string,
    cardsCount: number,
    navigation:any,
    moves:number,
    time:number,
    show:boolean,
}

export const WinModal = (props: ModalProps) => {
    const dims = Dimensions.get('window')
    const isMobile:boolean = dims.width < DESKTOP_MIN_WIDTH
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.show}
        >
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 22,
            }}>
                <View style={{
                    margin: 20,
                    backgroundColor: 'peachpuff',
                    borderRadius: 20,
                    padding: 35,
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,
                    maxWidth: isMobile ? MODAL_WIDTH_MOBILE : MODAL_WIDTH_DESKTOP
                }}>
                    <Text style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                        color: 'darkblue',
                        marginBottom: 25,
                        textAlign: 'center',
                    }}>
                        {`Finished in ${props.moves} moves and ${props.time.toFixed(1)} seconds on ${props.level} difficulty`}
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignContent:'center',
                        width: '100%',
                    }}>
                        <GoHomeButton
                            navigation={props.navigation}
                        ></GoHomeButton>
                        <RestartButton
                            level={props.cardsCount}
                            navigation={props.navigation}
                        ></RestartButton>
                        <ShareButton
                            level={props.level}
                            time={props.time}
                            moves={props.moves}
                        ></ShareButton>
                    </View>
                </View>
            </View>
        </Modal>
    )
}